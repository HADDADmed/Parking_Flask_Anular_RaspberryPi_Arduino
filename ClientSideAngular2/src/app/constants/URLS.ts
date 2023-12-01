



const BASE_IP_ADDRESS = 'http://192.168.1.174:5000'
const BASE_URL = 'http://localhost:5000'


const BASE_URL_USED = BASE_IP_ADDRESS



export const USER_LOGIN_URL = BASE_URL_USED + '/login'
export const USER_ADD_URL = BASE_URL_USED + '/saveUser'
export const USERS_URL = BASE_URL_USED + '/users'
export const VEHICLE_ADD_URL = BASE_URL_USED + '/saveVehicule'
export const VEHICLES_URL = BASE_URL_USED + '/vehicles'
export const VEHICLE_BY_ID_URL = VEHICLES_URL + '/vehicle/'
export const VEHICLES_BY_USER_ID_URL = BASE_URL_USED + '/getVehiclesByUserId/'


export const DASHBOARD_URL = BASE_URL_USED + '/dashboardStatistiques'


