import axios from "axios";

const BaseURL = "http://localhost:8080";

const DataXmlPdfAPI = {
    dataPdf: async () => {
        const res = await axios.get(`${BaseURL}/dataPdf`);
        // console.log(res);
        return res;
    },
};

export default DataXmlPdfAPI;