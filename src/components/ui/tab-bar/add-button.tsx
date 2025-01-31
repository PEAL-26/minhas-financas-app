import {
  ArrowDownUpIcon,
  ListIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react-native";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

import { styles } from "./styles";
import { FloatingActionButton } from "../floating-action-button";
import { NeedModal } from "@/components/modals/need-modal";
import { useState } from "react";

const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity);

type ModalTypes = "transaction" | "income" | "expense" | "need";

export function AddButton() {

  const [showModal, setShowModal] = useState() 
  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

  const handleOpenModal = (modal: ModalTypes) => {
    isExpanded.value = false;
  };

  return (
    <>
      <View style={[styles.buttonContainer]}>
        <AnimatedPressable
          activeOpacity={0.7}
          style={[styles.shadow, styles.button]}
          onPress={handlePress}
        >
          <PlusIcon size={20} color={"#fff"} />
        </AnimatedPressable>
        <FloatingActionButton
          isExpanded={isExpanded}
          index={1}
          buttonLetter={"Transação"}
          icon={ArrowDownUpIcon}
          onPress={() => handleOpenModal("transaction")}
        />
        <FloatingActionButton
          isExpanded={isExpanded}
          index={2}
          buttonLetter={"Renda"}
          icon={TrendingUpIcon}
          onPress={() => handleOpenModal("income")}
        />
        <FloatingActionButton
          isExpanded={isExpanded}
          index={3}
          buttonLetter={"Despesa"}
          icon={TrendingDownIcon}
          onPress={() => handleOpenModal("expense")}
        />
        <FloatingActionButton
          isExpanded={isExpanded}
          index={4}
          buttonLetter={"Necessidade"}
          icon={ListIcon}
          onPress={() => handleOpenModal("need")}
        />
      </View>

      {/* <Pressable
        style={{
          backgroundColor: "#000",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom:0,
          width: 1000,
          height: 1000,
        }}
      /> */}

      <NeedModal />
    </>
  );
}
