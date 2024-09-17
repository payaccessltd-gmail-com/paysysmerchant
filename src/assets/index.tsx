import onboarding from './onboarding.svg'
import logo from './paysys-logo.svg'
import receipt from './receipt-item.svg'
import wallet from './wallet-2.svg'
import bill from './bill.png'
import building from './building.png'
import personalcard from './personalcard.png'
import cardPos from './card-pos.png'
import setting from './setting-2.svg'
import circle from './close-circle.svg';
import checked from './checked.svg';
import briefcase from './briefcase.svg';
import profile from './profile.svg';
import noData from './noData.svg';
import Spinner from './Spinner.svg';
import UploadFile from './uploadFile.svg';
import ikejaElectric from './ikejaElectric.svg';
import abujaElectric from './abujaElectric.svg';
import ekoElectric from './ekoElectric.svg';
import PHelectric from './PHelectric.svg';
import abiaElectric from './abiaElectric.svg';
import enuguElectric from './enuguElectric.svg';
import josElectric from './josElectric.svg';
import kanoElectric from './kanoElectric.svg';
import kadunaElectric from './kadunaElectric.svg';
import DStv from './DStv.svg';
import gotv from './gotv.svg';
import showmax from './showmax.svg';
import mtn from './mtn.svg';
import airtel from './airtel.svg';
import glo from './glo.svg';
import copy from './copy.svg';
import success from './success.svg';
import error from './error.svg';
import folder from './folder-minus.svg';
import etisalat from './9mobile.svg';
import icon1 from './icon1.svg';
import icon2 from './icon2.svg';
import icon3 from './icon3.svg';
import icon4 from './icon4.svg';
import icon5 from './icon5.svg'; // or './icon6.svg'
import emailLeft from './left_icon.svg';
import emailRight from './right_icon.svg'
import blueBtn from './blueBtn.svg';
import redBtn from './redBtn.svg';
import redirect from './redirect.svg';
import pan from './pan.svg';
import file from './file.svg';
import downloadFile from './downloadFile.jpeg';
import buildbot from './buildbot_.png';
import noContent from './404.png';

export const Image={
    buildbot,
    noContent,
    file,
    downloadFile,
    pan,
    redirect,
    blueBtn,
    redBtn,
    emailLeft,
    emailRight,
    onboarding,
    copy,
    success,
    error,
    folder,
    logo,
    receipt,
    DStv,
    gotv,
    showmax,
    ikejaElectric,
    abujaElectric,
    ekoElectric,
    PHelectric,
    abiaElectric,
    enuguElectric,
    josElectric,
    kanoElectric,
    kadunaElectric,
    wallet,
    bill,
    building,
    cardPos,
    personalcard,
    setting,
    circle,
    checked,
    briefcase,
    profile,
    noData,
    Spinner,
    UploadFile,
    mtn,
    glo,
    airtel,
    etisalat,
    icon1,
    icon2,
    icon3,
    icon4,
    icon5
}

export const IsChecked =  (): any  => {
   <>
     <svg className="w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.667 12l2.666 2.666L16 9.332"></path>
                                </svg>
   </>
}

export const NotChecked = (): any => {
    <div className="w-4 h-4 rounded-full border border-gray-400 bg-white flex items-center justify-center"></div>
}