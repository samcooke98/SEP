import React from "react";

import LinkCard from "./LinkCard.js";

/**
 * Takes a prop of Resources, which should be resource objects. Renders them in a grid. 
 * @param {} props 
 */
const ResourceList = (props) => {
    const resources = props.resources;
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: "wrap", flex: 1, flexDirection: 'row' }}>
            { /*TODO: Sort the order */
                resources.map((resource, i) => {
                    if(resource === null || resource === undefined) return null;
                    return <LinkCard
                        key={resource._id}
                        title={resource.title || ''}
                        img={resource.imgURL || ''}
                        text={resource.description}
                        tags={resource.tags}
                        url={resource.url}
                        resourceId={resource._id}
                        openFunc={() => openURL(resource.url) }
                        commentFunc={() => props.navigate(`/resource/${resource._id}/comments`)}
                        removeFunc={() => props.deleteResource(resource._id)}
                        showDelete={ props.userOwnedTeams.includes(resource.team)} 
                    />
                })
            }
        </div>
    )
}

const openURL = (url) => {
    window.open(
        url.includes("http://") || url.includes('https://')
            ? this.props.url
            : "https://" + url
    )
}



export default ResourceList;
