
import { shallowMount } from "@vue/test-utils";
import Nav from "../src/components/Nav.vue";
import { useStore } from "vuex";

jest.mock("vue-router", () => ({
    useRouter: () => ({
        push: jest.fn().mockResolvedValue(),
    }),
}));
jest.mock("vuex", () => ({
    useStore: () => ({
        state: { authenticated: false },
        dispatch: jest.fn(),
    }),
}));

describe("Nav.vue", () => {
    it('should  contain "Connexion" and "Inscription" links when user is not authenticated', () => {

        const wrapper = shallowMount(Nav);

        expect(wrapper.exists()).toBe(true);


        const loginLink = wrapper.find('router-link[to="/login"]');
        const registerLink = wrapper.find('router-link[to="/register"]');

        expect(loginLink.exists()).toBe(true);
        expect(registerLink.exists()).toBe(true);
    });
});