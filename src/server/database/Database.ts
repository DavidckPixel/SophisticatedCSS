import { Database as RawDb } from "sqlite3";
import Repository from "./Repository";
import * as DataType from "./DataType";

export interface Metadata {
    /** The name of the database table */
    table: string,
    
    /** A list of fields that serve as primary key */
    pk: string[],

    /** All synchronized fields associated with the entity */
    fields: { [field: string]: DataType.Type } 
}

export default class Database {
    /** The current database */
    db: RawDb;

    /** Registered entity types */
    types: Metadata[];

    constructor(db: RawDb) {
        this.db = db;
        this.types = [];
    }

    /**
     * Register a new database entity type.
     * 
     * @param table The database table to register.
     * @param construct The constructor for the entity type.
     * @param pk The primary key field.
     * @param fields The mapped database fields to register.
     */
    public register<Entity>(entity: { new(...args: any): Entity }, fields: { [field: string]: DataType.Type })
    {
        // Extract table name
        let table = entity.name;

        // Filter all primary keys
        let pk = Object.entries(fields).filter(([_,metadata]) => metadata.primary).map(([field,_]) => field);

        // Register entity type
        this.types.push({ table, pk, fields });
    }

    /**
     * Get a repository for a registered type.
     * 
     * @param entity The registered constructor for the entity type.
     * @returns A repository corresponding to that type.
     */
    public repository<Entity>(entity: { new(...args: any): Entity }): Repository<Entity> {
        let metadata = this.types.find((t) => t.table === entity.name);
        if (metadata) {
            return new Repository<Entity>(this, metadata, entity);
        } else {
            throw new Error("Entity is not registered");
        }
    }

    /**
     * Create a database schema for the registered types and schedule the queries.
     */
    public async create() {
        let queries = [];

        // Iterate over all registered entity types
        for (const metadata of this.types) {
            let properties: string[] = [];
            let constraints: string[] = [];

            // Add fields
            for (const field in metadata.fields) {
                properties.push(`${field} ${metadata.fields[field].sqlType(this.types)}`);
                constraints = [...constraints, ...metadata.fields[field].sqlConstraint(field, metadata.table, this.types)];
            }

            // Add primary key constraint
            constraints.push(`CONSTRAINT ${metadata.table}_pk PRIMARY KEY (${metadata.pk.join(',')})`);

            // Schedule query
            queries.push(this.query(`CREATE TABLE ${metadata.table}(${[...properties, ...constraints].join(',')})`));
        }
        
        // Wait for all queries to complete
        await Promise.all(queries);
    }

    public async fixture<Entity>(...entities: Entity[]) {
        // Check if data was given
        if (entities.length === 0) {
            return Promise.resolve();
        }

        // Find the repository for this type
        const repository = this.repository(Object.getPrototypeOf(entities[0]).constructor);
    
        // Clear database table
        await repository.query(`DELETE FROM ${repository.table()}`);
    
        // Load fresh data
        return Promise.all([
            ...entities.map(obj => repository.insert(obj))
        ]);
    }

    /**
     * Run a database query, wrapped in a promise.
     * 
     * @returns A promise representing a database query 
     */
    public query(sql: string, params: any = {}): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            console.log(sql);
            this.db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
        });
    }

    /**
     * Close the database connection.
     */
    public close() {
        this.db.close();
    }
}