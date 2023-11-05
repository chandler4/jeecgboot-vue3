import { defineStore } from 'pinia'

export const useButtonViewStore = defineStore('buttonView', () => {

	const instances = {};

  return {
		register(instance) {
			instances[instance.uid] = instance;
		},
		unRegister(uid) {
			delete instances[uid];
		},
		show(uid) {
			Object.values(instances).map(instance => {
				if (instance.uid === uid) {
					return;
				}
				instance.exposed.hide();
			});
		}
	}
})
