import axios from "axios";

const BaseURL = "https://jefiwash-backendas.onrender.com";

const DataXmlPdfAPI = {
    dataPdf: async () => {
        const res = await axios.get(`${BaseURL}/dataPdf`);
        // console.log(res);
        return res;
    },
};

export default DataXmlPdfAPI;