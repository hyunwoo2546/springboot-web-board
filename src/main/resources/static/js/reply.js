async function getList({bno, page, size, goLast}) {

    const result = await axios.get(`/replies/list/${bno}`,{params: {page,size}})

    if(goLast) {

        const total = result.data.total
        const lastPage = parseInt(Math.ceil(total/size))

        return getList({bno:bno,page:lastPage,size:size})

    }

    return result.data
}