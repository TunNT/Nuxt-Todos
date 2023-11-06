import { defineStore } from "pinia";
import axios from "axios";
export const usePlanets = defineStore('planets', {
    state: () => ({
        planetData: [],
    }),
    getters: {
        deletePl: (state) => (id) => {
            return state.planetData.splice(id, 1);
        }
    },
    actions: {
        async listPlanet() {
            try {
                const { data } = await axios.get('https://api.nuxtjs.dev/planets');
                this.planetData = data;
            } catch (err) {
                console.log(err);
            }
        },

        async deletePlanet(id) {
            this.planetData = [...this.planetData.slice(0, id), ...this.planetData.slice(id + 1)];
        }
    }
})