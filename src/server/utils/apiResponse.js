//Provides functions to generate API responses.
//This helps ensure a consistent type


export function sendError( errMessage ) { 
    return { 
        success: false, 
        payload: errMessage
    }
}

export function sendPayload ( payload ) { 
    return { 
        success: true,
        payload: payload 
    }
}