import React from 'react';
import { View, TouchableOpacity, Text, Modal, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../../assets/theme/color';
import { CustomButton } from '../Button';

interface AppModal {
    modalVisible?: any
    modalFooter: any
    modalBody: any
    title: any
    setModalVisible?: any
    closeOnTouchOutside?: any
}

export const AppModal: React.FC<AppModal> = ({
    modalVisible,
    modalFooter,
    modalBody,
    title,
    setModalVisible,
    closeOnTouchOutside,
}) => {
    return (
        <Modal visible={modalVisible} transparent>
            <TouchableOpacity
                onPress={() => {
                    if (closeOnTouchOutside) {
                        setModalVisible(false);
                    }
                }}
                style={styles.wrapper}>
                <View style={styles.modalView}>
                    <ScrollView>
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(false);
                                }}>
                            </TouchableOpacity>
                            <Text style={styles.title}>{title || 'Modifier mon profil'}</Text>

                            <View />
                            <View />
                            <View />
                            <View />
                            <View />
                        </View>
                        <View style={styles.footerSeparator} />

                        <View style={styles.body}>{modalBody}</View>
                        {modalFooter}

                        {!modalFooter && (
                            <View>
                                <>
                                    <View style={styles.footerSeparator} />
                                    <View style={styles.footerItems}>
                                        <View style={styles.footer}>
                                          <CustomButton
                                            danger
                                          title= 'cancel'
                                          ></CustomButton>
                                            <CustomButton
                                                secondary
                                                title='valider'
                                            ></CustomButton>
                                        </View>
                                    </View>
                                </>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

AppModal.propTypes = {
    closeOnTouchOutside: PropTypes.bool,
};

AppModal.defaultProps = {
    closeOnTouchOutside: true,
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        justifyContent: 'center',
    },

    modalView: {
        backgroundColor: colors.white,
        marginHorizontal: 20,
        borderRadius: 4,
        minHeight: 500,
    },

    header: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 21,
    },

    body: {
        minHeight: 600,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    footer: {
        justifyContent: 'space-evenly',
        paddingVertical: 7,
        alignItems: 'center',
        flexDirection: 'row',
    },

    termsView: {
        width: 5,
        height: 5,
        borderRadius: 100,
        backgroundColor: colors.grey,
    },

    footerSeparator: {
        height: 0.5,
        backgroundColor: colors.grey,
    },

    footerItems: {
        width: '100%',
        padding: 10,
    },

    footerText: {
        fontSize: 12,
    },
});



