import { normalize, schema } from 'normalizr';

const teamEntity = new schema.Entity("teams", { users: [userEntity] }, {idAttribute: '_id'});

const commentEntity = new schema.Entity("comments", {}, {idAttribute: '_id'});

const resourceEntity = new schema.Entity("resources", {comments: [ commentEntity ]}, {idAttribute: '_id'});

const userEntity  = new schema.Entity("users", { teams: [teamEntity]}, {idAttribute: '_id'});

export const normalizeResource  = (data) => normalize(data, resourceEntity);
export const normalizeResources = (data) => normalize(data, [resourceEntity]);

export const normalizeComment = (data) => normalize(data, commentEntity);

export const normalizeUser = (data) => normalize( data, userEntity );
export const normalizeUsers= (data) => normalize( data, [userEntity] )


export const normalizeTeam = (data) => normalize(data, teamEntity);