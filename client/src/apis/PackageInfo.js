import PackageLookUp from "./PackageLookUp";
import UserInfo from "./UserInfo";

// const isAdmin = await UserInfo.isAdmin()

const PackageInfo = {

    getPackages : async () => {
        try {
            const response = await PackageLookUp.get('/getPackages')
            // console.log(response)
            return response
        }
        catch (error) {
            console.log(error)
        }
    },

    updatePackage : async (isAdmin, package_id, package_name, package_description, package_price) => {
        try {
            // console.log(isAdmin)
            if(isAdmin) {
                const response = await PackageLookUp.post('/updatePackage', {
                    package_id: package_id,
                    package_name: package_name,
                    package_description: package_description,
                    package_price: package_price
            })
                return response
            }
            else {
                return console.log("not an admin")
            }}
            catch (error) {
                console.log(error)
            }
    },

    deletePackage : async (isAdmin, package_id) => {
        try {
            // console.log("asdasd", isAdmin, package_id)
            if(isAdmin) {
                const response = await PackageLookUp.delete('/deletePackage', {
                    headers: {
                        package_id: package_id,
                        isAdmin: isAdmin
                    }})
                return response
            }}
            catch (error) {
                console.log(error)
            }
    }
}

export default PackageInfo