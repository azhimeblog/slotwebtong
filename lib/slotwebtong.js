'use babel';

import SlotwebtongView from './slotwebtong-view';
import { CompositeDisposable } from 'atom';

export default {

  slotwebtongView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotwebtongView = new SlotwebtongView(state.slotwebtongViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotwebtongView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slotwebtong:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotwebtongView.destroy();
  },

  serialize() {
    return {
      slotwebtongViewState: this.slotwebtongView.serialize()
    };
  },

  toggle() {
    console.log('Slotwebtong was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
