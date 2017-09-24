import { normalize, schema } from 'normalizr';

const teamEntity = new schema.Entity("teams", {}, {idAttribute: '_id'});

const resourceEntity = new schema.Entity("resources", {}, {idAttribute: '_id'});

const userEntity  = new schema.Entity("users", { teams: [teamEntity]}, {idAttribute: '_id'});

const commentEntity = new schema.Entity("comments", {}, {idAttribute: '_id'});

export const normalizeResource  = (data) => normalize(data, resourceEntity);
export const normalizeResources = (data) => normalize(data, [resourceEntity]);

export const normalizeComment = (data) => normalize(data, commentEntity);

export const normalizeUser = (data) => normalize( data, userEntity );


export const normalizeTeam = (data) => normalize(data, teamEntity);