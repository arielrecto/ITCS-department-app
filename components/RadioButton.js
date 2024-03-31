import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const RenderRadioButton = ({ radioData }) => {
  const [selectedOption, setSelectedOption] = useState(null); // Ensure this hook is called only once and at the top level

  const handleInput = (value) => {
    setSelectedOption(value);
  };

  let radioButtons = [];
  for (let i = 1; i <= radioData.radio_max; i++) {
    radioButtons.push({
      id: i,
      label: i,
      value: i,
    });
  }

  return (
    <RadioButtonsGroup
      radioButtons={radioButtons}
      color={Colors.neutral}
      onPress={handleInput}
      selectedOption={selectedOption}
    />
  );
};

const RadioButtonsGroup = ({
  radioButtons,
  color,
  onPress,
  selectedOption,
}) => {
  return (
    <View>
      {radioButtons.map((radioButton) => (
        <RadioButton
          key={radioButton.id}
          radioButton={radioButton}
          color={color}
          onPress={onPress}
          selectedOption={selectedOption}
        />
      ))}
    </View>
  );
};

const RadioButton = ({ radioButton, color, onPress, selectedOption }) => {
  const { id, label, value } = radioButton;

  const handlePress = () => {
    onPress(value);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: color,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {selectedOption === value && (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: color,
              }}
            />
          )}
        </View>
        <Text style={{ marginLeft: 8 }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderRadioButton;
