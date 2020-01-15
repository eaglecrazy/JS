import chatHeader from './chatHeader.js';
import chatContent from './chatContent.js';
import chatForm from './chatForm.js';

export default {
    name: 'chat',
    props: ['visible'],
    template: `<div class="chatWrapper" v-bind:class="{ 'chatCollapsed': isCollapsed }">
                    <chatHeader></chatHeader>
                    <chatContent></chatContent>
                    <chatForm></chatForm>
                </div>`,
    components: {
        chatHeader,
        chatContent,
        chatForm
    },
    computed: {
        isCollapsed() {
            return !this.visible;
        }
    }
}