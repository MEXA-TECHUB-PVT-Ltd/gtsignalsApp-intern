import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomDivider = ({
    color = '#949494',
    width = '100%',
    height = 0.5,
    marginLeft = 0,
    marginRight = 0,
    marginTop = 0,
    marginBottom = 0,
    vertical = false,
    borderRadius = 0,
    opacity = 1,
    borderStyle = 'solid',
    padding = 0,
    paddingLeft = 0,
    paddingRight = 0,
    paddingTop = 0,
    paddingBottom = 0,
    style,
}) => {
    return (
        <View
            style={[
                styles.divider,
                {
                    backgroundColor: color,
                    width: vertical ? height : width,
                    height: vertical ? width : height,
                    marginLeft,
                    marginRight,
                    marginTop,
                    marginBottom,
                    borderRadius,
                    opacity,
                    borderStyle,
                    padding,
                    paddingLeft,
                    paddingRight,
                    paddingTop,
                    paddingBottom,
                },
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    divider: {
        //set defaults if u want...otherwise customize it by props
    },
});

export default CustomDivider;
