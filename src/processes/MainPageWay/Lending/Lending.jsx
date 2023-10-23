import React from "react";
import IntroduceBlock from "../../../components/IntroduceBlock/IntroduceBlock";
import AdvantagesBlock from "../../../components/AdvantagesBlock/AdvantagesBlock";
import DonatesBlock from "../../../components/DonatesBlock/DonatesBlock";

const Lending = ({setSupportModalVisible}) => {

    return (
        <>
            <IntroduceBlock setSupportModalVisible={setSupportModalVisible} />
            <AdvantagesBlock />
            <DonatesBlock />
        </>
    )
}

export default Lending