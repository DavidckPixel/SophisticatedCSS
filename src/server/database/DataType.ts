import { Metadata } from './Database';

/** Type information concerning a field */
export interface Type {
    /** Whether this field is part of the primary key */
    primary: boolean,

    /** The database column type (expressed as SQL) */
    sqlType: (metadata: Metadata[]) => string,

    /** The constraints associated with this field */
    sqlConstraint: (field: string, table: string, metadata: Metadata[]) => string[],
}

export interface Nullable {
    nullable: boolean
}

export type StringOptions = Partial<Nullable>;

/**
 * Set a field as a string type.
 */
export function String(options: StringOptions = {}): Type {
    return {
        primary: false,
        sqlType: (_) => `TEXT ${options.nullable || false ? 'DEFAULT NULL' : 'NOT NULL'}`,
        sqlConstraint: (_field, _table, _metadata) => [],
    };
}

export interface ForeignKeyOptions<Entity> extends Partial<Nullable> {
    entity: { new(...args: any): Entity }
}

/**
 * Set a field as a foreign key, directed at another entity.
 */
export function Foreign<T>(options: ForeignKeyOptions<T>): Type {
    const fkTable = options.entity.name; 

    // Function to get the metadata for the destination table
    const findForeign = (table: string, metadata: Metadata[]): Metadata => {
        const foreign = metadata.find(x => x.table === table);
        if (!foreign) {
            throw new Error(`Entity '${table}' is not registered.`);
        }
        if (foreign.pk.length != 1) {
            throw new Error('Only tables with a single primary key are supported');
        }
        return foreign;
    }

    return {
        primary: false,
        sqlType: (metadata) => {
            const foreign = findForeign(fkTable, metadata);
            const fkField = foreign.pk[0];
            const fkMeta = foreign.fields[fkField];
            return fkMeta.sqlType(metadata);
        },
        sqlConstraint: (field, table, metadata) => {
            const foreign = findForeign(fkTable, metadata);
            const fkField = foreign.pk[0];
            return [`CONSTRAINT ${table}_fk_${fkTable} FOREIGN KEY (${field}) REFERENCES ${fkTable}(${fkField})`];
        }
    };
}

/**
 * Set a field as part of the primary key.
 */
export function Primary(type: Type): Type {
    return {
        ...type,
        primary: true
    };
}