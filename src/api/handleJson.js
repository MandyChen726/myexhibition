import axios from "axios";

export function readJSON(path) {
    return axios('json/' + path + '.json')
}