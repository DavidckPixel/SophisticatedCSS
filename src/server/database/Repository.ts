import Database, { Metadata } from "./Database";

export default class Repository<Entity extends {[key: string]: any}> {
    /** The current database */
    db: Database;
    
    /** The metadata for this type */
    metadata: Metadata;
    
    /** The constructor for this type */
    construct: { new(...args: any): Entity };

    constructor(db: Database, metadata: Metadata, construct: { new(...args: any): Entity }) {
        this.db = db;
        this.metadata = metadata;
        this.construct = construct;
    }

    /**
     * Get the tablename for this type
     */
    public table(): string {
        return this.metadata.table;
    }

    /**
     * Find any number of entities in the database, specified by a dictionary of entity keys and corresponding values
     * 
     * @param fields A dictionary of entity fields and corresponding required values
     * @returns A promise, containing the corresponding entities
     */
    public async findBy(fields: { [field: string]: string }): Promise<Entity[]> {
        let filter = Object.keys(fields).map(field => field + " = ?").join(" AND ");
        let values = Object.values(fields);
        return await this.query(`SELECT ${this.fields().join(',')} FROM ${this.table()} WHERE ${filter}`, values);
    }
    
    /**
     * Find at most one entity in the database, specified by a dictionary of entity keys and corresponding values
     * 
     * @param fields A dictionary of entity fields and corresponding required values
     * @returns A promise, containing the corresponding entity or null
     */
    public async findOneBy(fields: { [field: string]: string }): Promise<Entity | null> {
        let objs = await this.findBy(fields);
        if (objs.length > 1) {
            throw new Error("More than entity was found");
        }
        return objs.pop() ?? null;
    }
    
    /**
     * Find at most one entity in the database by the value for its primary key
     * 
     * @param primary The value of the primary key
     * @returns A promise, containing the corresponding entity or null
     */
    public async find(primary: string): Promise<Entity | null> {
        let pk = this.metadata.pk[0];
        return this.findOneBy({ [pk]: primary });
    }

    /**
     * Find all entities in the database
     * 
     * @returns A promise, containing an array of all the corresponding entities
     */
    public async findAll(): Promise<Entity[]> {
        return await this.query(`SELECT ${this.fields().join(',')} FROM ${this.table()}`)
    }

    /**
     * Insert a new entity in the database
     * 
     * @param obj The entity to be inserted in the database
     * @returns A promise indicating success or failure
     */
    public async insert(obj: Entity): Promise<void> {
        let data = this.fields().map(field => obj[field]);
        let replace = this.fields().map(_ => "?").join(',');
        await this.db.query(`INSERT INTO ${this.table()} (${this.fields().join(',')}) VALUES (${replace})`, data);
    }
    
    public async update(obj: Entity): Promise<void> {
        let data = this.fields().map(field => obj[field]);
        let replace = this.fields().map(field => field+" = ?").join(',')

        let filter = this.metadata.pk.map(field => field + " = ?").join(" AND ");
        let values = this.metadata.pk.map(field =>obj[field])

        data.push(...values)
        
        await this.db.query(`UPDATE ${this.table()} SET ${replace} WHERE ${filter} `, data);
    }

    public async remove(obj: Entity): Promise<void> {
        // todo
    }


    /**
     * Execute a raw sql query for the entity
     * 
     * @param sql The raw query to be inserted in the database
     * @param params The parameters for the sql query
     * @returns A promise, containing the corresponding entities
     */
    public async query(sql: string, params?: any): Promise<Entity[]> {
        let result = await this.db.query(sql, params);
        return result.map(data => this.hydrate(data));
    }

    private fields(): string[] {
        return Object.keys(this.metadata.fields);
    }

    private hydrate(data: { [key: string]: any }): Entity {
        let entity = new this.construct();
        Object.assign(entity, data);
        return entity;
    }
}