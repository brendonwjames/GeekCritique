import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from '../src/components/Modals/ModalContext/Modal'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faCirclePlus, faSquarePlus, faRightFromBracket, faTrashCan, faBookBookmark, faFloppyDisk, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faHouse, faCirclePlus, faSquarePlus, faRightFromBracket, faTrashCan, faBookBookmark, faFloppyDisk, faPenToSquare, faXmark)

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
