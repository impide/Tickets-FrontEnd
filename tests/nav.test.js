
import { shallowMount } from "@vue/test-utils";
import Nav from "../src/components/Nav.vue";
import { useStore } from "vuex";

jest.mock("vue-router", () => ({
    useRouter: () => ({
        push: jest.fn().mockResolvedValue(),
    }),
}));

jest.mock("vuex");

describe("Nav.vue", () => {
    it('should not contain "Connexion" and "Inscription" links when user is authenticated', () => {

        useStore.mockImplementation(() => ({
            state: { authenticated: true },
        }));

        const wrapper = shallowMount(Nav);

        expect(wrapper.exists()).toBe(true);


        const loginLink = wrapper.find('#login');
        const registerLink = wrapper.find('#register');

        expect(loginLink.exists()).toBe(false);
        expect(registerLink.exists()).toBe(false);
    });
    it('should contain "Connexion" and "Inscription" links when user is not authenticated', () => {
        useStore.mockImplementation(() => ({
            state: { authenticated: false },
        }));

        const wrapper = shallowMount(Nav);

        expect(wrapper.exists()).toBe(true);


        const loginLink = wrapper.find('#login');
        const registerLink = wrapper.find('#register');

        expect(loginLink.exists()).toBe(true);
        expect(registerLink.exists()).toBe(true);
    });
    it('should call logout on setup method', () => {
        const wrapper = shallowMount(Nav);
        expect(wrapper.vm.logout).toBeDefined();

    });

    it('should call logout on click button', () => {
        useStore.mockImplementation(() => ({
            state: { authenticated: true },
        }));

        const wrapper = shallowMount(Nav);

        const logoutButton = wrapper.find('#logout');
        logoutButton.trigger('click');
        const spy = jest.spyOn(wrapper.vm, 'logout');
        expect(spy).toHaveBeenCalled();
    });

    // it('should remove authToken and userId on local storage', () => {
    // });
});