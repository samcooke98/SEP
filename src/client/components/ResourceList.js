import React from "react";

import LinkCard from "./LinkCard.js";

/**
 * Takes a prop of Resources, which should be resource objects. Renders them in a grid. 
 * @param {} props 
 */
const ResourceList = (props) => {
    const resources = props.resources;
    console.log(resources);
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: "wrap", flex: 1, flexDirection: 'row' }}>
            { /*TODO: Show only teams that user belongs to, Sort the order */
               resources.map((resource, i) => {
                    return <LinkCard
                        key={resource._id}
                        title={resource.title || ''}
                        subtitle={resource.url}
                        text={resource.description}
                        tags={resource.tags}
                        url={resource.url}
                        resourceId={resource._id}
                        openFunc={() => console.log("TODO: OPEN")}
                        commentFunc={() => console.log("TODO: COMMETNS")}
                        removeFunc={() => console.log("TODO: DELETE")}
                    />
                })
            }
        </div>
    )
}

export default ResourceList;
