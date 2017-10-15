import React from "react";

import LinkCard from "./LinkCard.js";

/**
 * Takes a prop of Resources, which should be resource objects. Renders them in a grid. 
 * @param {} props 
 */
const ResourceList = (props) => {
    const resources = props.resources;
    console.log(props.userOwnedTeams);
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: "wrap", flex: 1, flexDirection: 'row' }}>
            { /*TODO: Sort the order */
                resources.map((resource, i) => {
                    console.log(resource.team)
                    console.log(props.userOwnedTeams.includes(resource.team))
                    
                    return <LinkCard
                        key={resource._id}
                        title={resource.title || ''}
                        subtitle={resource.url}
                        text={resource.description}
                        tags={resource.tags}
                        url={resource.url}
                        resourceId={resource._id}
                        openFunc={() => openURL(resource.url) }
                        commentFunc={() => props.navigate(`resource/${resource._id}/comments`)}
                        removeFunc={() => console.log("TODO: DELETE")}
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

const openComments = (id) => { 
    this.navigateWithRouter.bind(this, "resource/" + resource._id + "/comments")
}

export default ResourceList;
