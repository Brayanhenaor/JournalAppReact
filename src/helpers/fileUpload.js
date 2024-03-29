export const fileUpload = async (file) =>{
    
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dzxqbcv9q/upload';

    const formData = new FormData();
    formData.append('upload_preset','ReactJournal');
    formData.append('file', file);

    try{
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body:formData
        });

        if(resp.ok){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }

        throw await resp.json();

    }catch (error)
    {
        throw error;
    }
}