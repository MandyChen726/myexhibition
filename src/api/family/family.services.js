import http from "../http-common";

class FamilyServices {
    create(data) {
        return http.post(`/mandy/family/`, data);
    }

    findOneByFamilyUID(uid) {
        return http.get(`/mandy/family/familyUID/${uid}`);
    }

    update(uid, data) {
        return http.put(`/mandy/family/${uid}`, data);
    }
}

export default new FamilyServices();