class EasyHttp{
    //HTTP get request
    async get(url){
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }
    //HTTP post request
    async post(url, data){
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }
    async put(url, data) {
        const response = await fetch(url, {
            method:'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }
    async delete(url){
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const resData = 'Post Deleted';
        return resData;
    }
}

export const http = new EasyHttp();