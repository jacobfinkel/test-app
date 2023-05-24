//import { Flex } from '@gmg/gmg-react-components';
import React, { FC, useContext, useEffect, useState } from 'react';
//import AppContext, { Language } from '../AppContext';
//import { IConfig } from '../Config';
import useScript from './useScript';

export interface SignInParameters {
  signInAttributes: SignInAttributes;
  populateCacheForAppSynch: () => Promise<void>;
  signOut: () => void;
  updateLocale: (value: string) => Promise<void>;
}
interface SignInAttributes {
  userAttributes: SignInUserAttributes;
  refreshToken: string;
}
interface SignInUserAttributes {
  guid: string;
  email: string;
  firstName: string;
  lastName: string;
  orgId: string;
  role: string;
}
interface UserRegistrationProps {
  onSignIn: (params: SignInParameters) => void;
  theme: string;
}

const devUrl = 'https://d209ry4j4fbd65.cloudfront.net/static/js/main.js';
const testUrl = 'https://d15qoiiffw6h03.cloudfront.net/static/js/main.js';
const amplifyDev = {
  region: 'eu-central-1',
  userPoolId: 'eu-central-1_E2tf3yd45',
  userPoolWebClientId: '3c8nh0m2l2dq2gm33qaliehkn',
  identityPoolId: 'eu-central-1:eb3e40ec-7670-45aa-a0e2-5c7174056889',
};
const amplifyTest = {
  region: 'eu-central-1',
  userPoolId: 'eu-central-1_hmb3la9k2',
  userPoolWebClientId: '5k2ehqmsnfn2bcppkd1dp2pkvn',
  identityPoolId: 'eu-central-1:8f804412-1f36-4040-9d56-8d763c596191',
};
const UserRegistration: FC<UserRegistrationProps> = (props) => {
  //const appContext = useContext(AppContext);
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true); // try if this is working without

  const handleUserRegistrationScriptLoad = () => {
    const interval = setInterval(() => {
      if ((window as any).__USERREGISTRATION_EVENTLISTENERSADDED === true) {
        clearInterval(interval);
        const renderEvent = new CustomEvent('render-userregistration', {
          detail: {
            loginTitle: 'Welcome to BCN',
            onSignIn: (params: SignInParameters) => {
              document.dispatchEvent(new CustomEvent('unmount-userregistration'));
              props.onSignIn(params);
            },
            root: document.getElementById('root'),
            theme: props.theme,
            onError: (e: any) => {
              console.log(JSON.stringify(e));
            },
            amplifyAuth: amplifyDev,
          },
        });
        document.dispatchEvent(renderEvent);
      }
    }, 100);
  };

  // // local CDP Admin consuming local UserRegistration:
  //  useScript({
  //    src: isInitialRender ? `http://localhost:3001/static/js/bundle.js?ts=${new Date().getTime()}` : null,
  //    onload: handleUserRegistrationScriptLoad,
  //    onerror: (e: Error) => {
  //      console.info('forgot to start UserRegistration on port 3001 ?');
  //    },
  //    defer: true,
  //  });
  //  useScript({
  //    src: isInitialRender ? `http://localhost:3001/static/js/vendors~main.chunk.js?ts=${new Date().getTime()}` : null,
  //    defer: true,
  //  });
  //  useScript({
  //    src: isInitialRender ? `http://localhost:3001/static/js/main.chunk.js?ts=${new Date().getTime()}` : null,
  //    defer: true,
  //  });
  //
  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  // comment useScript hook if you want to use local instance of UserRegistration
  useScript({
    src: isInitialRender ? devUrl : null,
    onload: handleUserRegistrationScriptLoad,
    onerror: (e: any) => {
      console.log(JSON.stringify(e));
    },
    defer: true,
  });

  return <div id="root-userregistration" />;
};

export default UserRegistration;
