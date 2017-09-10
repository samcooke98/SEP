import { normalize, schema } from 'normalizr';

const teamEntity = new schema.Entity("teams", {}, {idAttribute: '_id'});

const resourceEntity = new schema.Entity("resources", {}, {idAttribute: '_id'});

const userEntity  = new schema.Entity("users", {}, {idAttribute: '_id'});

export const normalizeResource  = (data) => normalize(data, resourceEntity);
export const normalizeResources = (data) => noramlize(data, [resourceEntity]) 