import React from 'react';
import {
  Box,
  VStack,
  ScrollView,
  StatusBar,
  HStack,
  Pressable,
  Icon,
  Image,
  Text,
  Hidden,
  useColorMode,
  IconButton,
  Divider,
  Menu,
  Input,
  MoonIcon,
  useColorModeValue,
  SunIcon,
  Button,
} from 'native-base';

import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

import Sidebar from './Sidebar';

export function Header(props) {
  const { toggleColorMode } = useColorMode();
  return (
    <Box
      px="6"
      pt="3"
      pb="5"
      borderBottomWidth="1"
      _dark={{ bg: 'coolGray.900', borderColor: 'coolGray.800' }}
      _light={{
        bg: { base: 'primary.900', md: 'white' },
        borderColor: 'coolGray.200',
      }}
    >
      <VStack alignSelf="center" width="100%">
        <HStack alignItems="center" justifyContent="space-between">
          <HStack space="3" alignItems="center">
            <IconButton icon={<Icon
              size="6"
              as={Ionicons}
              name={'ios-menu'}
              color={useColorModeValue('coolGray.800', 'coolGray.50')}
            />} 
            onPress={props.toggleSidebar} 
            variant="unstyled" />

          </HStack>
          {props.searchbar && (
            <Input
              px="4"
              w="30%"
              size="sm"
              placeholder="Search"
              InputLeftElement={
                <Icon
                  px="2"
                  size="4"
                  name={'search'}
                  as={FontAwesome}
                  _light={{
                    color: 'coolGray.400',
                  }}
                  _dark={{
                    color: 'coolGray.100',
                  }}
                />
              }
            />
          )}

          <HStack space="3" alignItems="center">
            <Pressable onPress={toggleColorMode}>
              {useColorModeValue(<MoonIcon size="6" />, <SunIcon size="6" />)}
            </Pressable>

            <Menu
              closeOnSelect={false}
              w="200"
              placement="bottom right"
              onOpen={() => console.log('opened')}
              onClose={() => console.log('closed')}
              trigger={(triggerProps) => {
                return (
                  <Button variant="unstyled" p="0" {...triggerProps}>
                  </Button>
                );
              }}
              _dark={{ bg: 'coolGray.800', borderColor: 'coolGray.700' }}
            >
              <Menu.Group title="Profile">
                <Menu.Item>Account</Menu.Item>
              </Menu.Group>
              <Divider mt="3" w="100%" _dark={{ bg: 'coolGray.700' }} />
              <Menu.Group title="Shortcuts">
                <Menu.Item>Settings</Menu.Item>
                <Menu.Item>Logout</Menu.Item>
              </Menu.Group>
            </Menu>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}

function MainContent(props) {
  return (
    <VStack maxW={props.maxWidth} flex={1} width="100%">
      {props.displayScreenTitle && (
        <Hidden till="md">
          <HStack mb="4" space={4}>
            <Pressable
              onPress={() => {
                console.log('hello');
              }}
            >
              <Icon
                size="6"
                pt="0.5"
                as={AntDesign}
                name={'arrowleft'}
                _light={{ color: 'coolGray.800' }}
                _dark={{ color: 'coolGray.50' }}
              />
            </Pressable>
            <VStack>
              <Text
                fontSize="lg"
                fontWeight="medium"
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'coolGray.800' }}
              >
                {props.title}
              </Text>
              <Text
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'coolGray.800' }}
                fontSize="sm"
                fontWeight="normal"
              >
                {props.subTitle}
              </Text>
            </VStack>
          </HStack>
        </Hidden>
      )}
      {props.children}
    </VStack>
  );
}

export function MobileHeader(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      px="1"
      pt="2"
      pb="2"
      _dark={{ bg: 'coolGray.900', borderColor: 'coolGray.800' }}
      _light={{
        bg: { base: 'primary.900', md: 'white' },
        borderColor: 'coolGray.200',
      }}
      bg="amber.300"
    >
      <HStack space="2" justifyContent="space-between">
        <HStack
          flex="1"
          space="2"
          justifyContent="space-between"
          alignItems="center"
        >
          <>
            <HStack alignItems="center" space="1">
              {props.backButton && (
                <IconButton
                  variant="ghost"
                  colorScheme="light"
                  _icon={{ color: 'coolGray.50' }}
                  icon={<Icon size="6" as={AntDesign} name="arrowleft" />}
                />
              )}
              <VStack>
                <Text color="coolGray.50" fontSize="lg">
                  {props.title}
                </Text>
                {props.subTitle ? (
                  <Text color="coolGray.50" fontSize="sm" fontWeight="normal">
                    {props.subTitle}
                  </Text>
                ) : undefined}
              </VStack>
            </HStack>
            {/* right panel */}

            <HStack space="1">
              <IconButton
                variant="unstyled"
                colorScheme="light"
                onPress={toggleColorMode}
                _icon={{ color: 'white' }}
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              />
              {props.rightPanel && (
                <IconButton
                  variant="unstyled"
                  colorScheme="light"
                  icon={
                    <Icon
                      size="6"
                      name="search"
                      as={FontAwesome}
                      _dark={{
                        color: 'coolGray.200',
                      }}
                      _light={{
                        color: 'coolGray.50',
                      }}
                    />
                  }
                />
              )}
            </HStack>
          </>
        </HStack>
      </HStack>
    </Box>
  );
}
function getSidebar(title) {
    return <Sidebar />;
}
export default function DashboardLayout({
  displayScreenTitle = true,
  displaySidebar = true,
  header = {
    searchbar: false,
  },
  maxWidth = 1016,
  mobileHeader = {
    backButton: true,
  },
  ...props
}) {
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(true);
  function toggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box
        safeAreaTop
        _light={{ bg: 'primary.900' }}
        _dark={{ bg: 'coolGray.900' }}
      />
      <VStack
        flex={1}
        _light={{ bg: 'primary.50' }}
        _dark={{ bg: 'customGray' }}
      >
        <Hidden from="md">
          <MobileHeader
            title={props.title}
            subTitle={props.subTitle}
            backButton={mobileHeader.backButton}
            rightPanel={props.rightPanelMobileHeader}
          />
        </Hidden>
        <Hidden till="md">
          <Header
            toggleSidebar={toggleSidebar}
            title={props.title}
            subTitle={props.subTitle}
            menuButton={displaySidebar}
            searchbar={header.searchbar}
          />
        </Hidden>

        <Box
          flex={1}
          safeAreaBottom
          flexDirection={{ base: 'column', md: 'row' }}
          _light={{
            borderTopColor: 'coolGray.200',
          }}
          _dark={{
            bg: 'coolGray.700',
            borderTopColor: 'coolGray.700',
          }}
        >
          {isSidebarVisible && displaySidebar && (
            <Hidden till="md">{getSidebar(props.title)}</Hidden>
          )}

          <Hidden till="md">
            <ScrollView
              flex={1}
              p={{ md: 8 }}
              contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <MainContent
                {...props}
                displayScreenTitle={displayScreenTitle}
                maxWidth={maxWidth}
              />
            </ScrollView>
          </Hidden>

          <Hidden from="md">
            <MainContent {...props} displayScreenTitle={displayScreenTitle} />
          </Hidden>
        </Box>
      </VStack>
    </>
  );
}
