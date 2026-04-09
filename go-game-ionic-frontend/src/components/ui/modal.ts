import { modalController } from '@ionic/vue'
import MessageModal from './MessageModal.vue'

export const showMessage = async (title: string, content: string) => {
    const modal = await modalController.create({
        component: MessageModal,
        componentProps: {
            title,
            content,
        },
        cssClass: 'small-message-modal',
        initialBreakpoint: 0.4,
        breakpoints: [0, 0.4, 0.8],
        backdropDismiss: false,
    })

    await modal.present()
    await modal.onWillDismiss()
}
