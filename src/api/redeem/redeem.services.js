import http from "../http-common";

class RedeemServices {
    create(data) {
        return http.post(`/mandy/redeem/`, data);
    }
    findAllByFamilyId(uid) {
        return http.get(`/mandy/redeem/familyUID/${uid}`);
    }

    update(id, uid, data) {
        return http.put(`/mandy/redeem/${id}?familyUID=${uid}`, data);
    }
}

export default new RedeemServices();