export const createResponse = (data: any) => {
    const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "max-age=3600",
        },
        body: JSON.stringify(data),
    };

    console.log("response: " + JSON.stringify(response));
    return response;
}
