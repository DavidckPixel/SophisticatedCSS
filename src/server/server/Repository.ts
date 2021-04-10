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

    public async findBy(fields: { [field: string]: string }): Promise<Entity[]> {
        let filter = Object.keys(fields).map(field => field + " = ?").join(" AND ");
        let values = Object.values(fields);
        return await this.query(`SELECT ${this.fields().join(',')} FROM ${this.metadata.table} WHERE ${filter}`, values);
    }

    public async findAll(): Promise<Entity[]> {
        return await this.db.query(`SELECT ${this.fields().join(',')} FROM ${this.metadata.table}`);
    }

    public async insert(obj: Entity): Promise<void> {
        let data = this.fields().map(field => obj[field]);
        let replace = this.fields().map(_ => "?").join(',');
        await this.db.query(`INSERT INTO ${this.metadata.table} (${this.fields().join(',')}) VALUES (${replace})`, data);
    }
    
    public async update(obj: Entity): Promise<void> {
        // todo
    }

    public async remove(obj: Entity): Promise<void> {
        // todo
    }

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