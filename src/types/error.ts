export interface ApiError extends Error {
    response: {
        data: {
            error: string;
            message: string | string[];
            statusCode: number;
        }
        
    }
}