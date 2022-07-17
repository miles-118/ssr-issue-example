import React from 'react';
import {
  HStack,
  Icon,
  Text,
  Pressable,
  ScrollView,
  Hidden,
  Box,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import DashboardLayout from '../../components/DashboardLayout';

const footerIcons = [
  { name: 'home', text: 'Home' },
  { name: 'wifi-tethering', text: 'Podcast' },
  { name: 'search', text: 'Search' },
  { name: 'queue-music', text: 'MyLibrary' },
];

function BottomNavigationItem({
  name,
  text,
  index,
}) {

  return (
    <Pressable
      px="18"
      py="2.5"
      alignItems="center"
      onPress={() => console.log('hello')}
      key={index}
    >
      <Icon
        as={MaterialIcons}
        name={name}
        size="5"
        _light={{
          color: name === text ? 'primary.900' : 'coolGray.400',
        }}
        _dark={{
          color: name === text ? 'primary.500' : 'coolGray.400',
        }}
      />
      <Text
        _light={{
          color: name === text ? 'primary.900' : 'coolGray.400',
        }}
        _dark={{
          color: name === text ? 'primary.500' : 'coolGray.400',
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}

function MobileFooter() {
  return (
    <Hidden from="md">
      <HStack
        justifyContent="space-between"
        safeAreaBottom
        h="20"
        width="100%"
        position="absolute"
        left="0"
        right="0"
        bottom="0"
        overflow="hidden"
        alignSelf="center"
        _light={{ backgroundColor: 'white' }}
        _dark={{ backgroundColor: 'coolGray.800' }}
      >
        {footerIcons.map((item, index) => {
          return (
            <BottomNavigationItem
              key={index}
              index={index}
              {...item}
            />
          );
        })}
      </HStack>
    </Hidden>
  );
}

export function HomeScreen() {
  return (
    <DashboardLayout
      title={'Dashboard'}
      displayScreenTitle={true}
      displayMenuButton
      displayBackButton={false}
    >
      <ScrollView bounces={false}>
        <Box
          _light={{ bg: 'white' }}
          _dark={{ bg: 'coolGray.800' }}
          borderRadius={{ md: 'sm' }}
          mb={{ base: 16, md: 0 }}
          pt={{ base: 5, md: 8 }}
          pb={8}
        >
        </Box>
      </ScrollView>
      <MobileFooter />
    </DashboardLayout>
  );
}
