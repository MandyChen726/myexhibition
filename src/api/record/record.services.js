import http from "../http-common";

class RecordServices {
    create(data) {
        return http.post(`/mandy/record/`, data);
    }

    findAllByFamilyId(uid, offset) {
        return http.get(`/mandy/record/familyUID/${uid}?offset=${offset}`);
    }
}

export default new RecordServices();