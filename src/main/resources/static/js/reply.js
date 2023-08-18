async function getList({bno, page, size, goLast}) {

    const result = await axios.get(`/replies/list/${bno}`,{params: {page,size}})

    if(goLast) {

        const total = result.data.total
        const lastPage = parseInt(Math.ceil(total/size))

        return getList({bno:bno,page:lastPage,size:size})

    }

    return result.data
}

async function getReply(rno) {

    const response = await axios.get(`/replies/${rno}`)

    return response.data

}

async function modifyReply(replyObj) {

    const response = await axios.put(`/replies/${replyObj.rno}`, replyObj)
    return response.data
}