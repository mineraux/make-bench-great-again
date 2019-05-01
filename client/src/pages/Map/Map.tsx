import React, {FunctionComponent} from 'react';
import Transition from './Transition';
import {observer} from 'mobx-react-lite'

import ProtoMap from '../../components/map/ProtoMap';
import {pageProps} from "../types";
import PageStore from "../../store/PageStore";

type props = pageProps & {}

const Map:  FunctionComponent<props> = ({show, match}) => {

  const {pageExiting} = PageStore

  return (
    <Transition show={show && !pageExiting}>
      <div className={"page-map"}>
        <p>Page : Map</p>
        <ProtoMap/>
      </div>
    </Transition>
  )
}

export default observer(Map);