import React, { useState } from 'react';
import {DrawerContentScrollView,DrawerItem,} from '@react-navigation/drawer';
import { Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function CustomDrawer({ state, navigation }: any) {
  const [hrExpanded, setHrExpanded] = useState(false);
  const [employee, setEmployee] = useState(false);

  const isRouteFocused = (routeName: string) => {
    const currentRoute = state.routes[state.index];
    return currentRoute.name === routeName;
  };

  return (
    <DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => setHrExpanded(!hrExpanded)}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
           height:50,
          borderRadius:25,
          justifyContent: 'space-between',
          backgroundColor: '#dfd',
          marginBottom:6,
        }}
      >
        
        <Text>
            <AntDesign name="team" size={17} color="black" />HR</Text>
        <AntDesign name={hrExpanded ? 'up' : 'down'} size={16} color="black"  />
      </TouchableOpacity>

      {hrExpanded && (
        <View style={{ paddingLeft: 10 }}>
          <TouchableOpacity
            onPress={() => setEmployee(!employee)}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 12,
              flexDirection: 'row',
              alignItems: 'center',
              padding:12,
              borderRadius:25,
              justifyContent: 'space-between',
              backgroundColor: '#dfd',
              marginBottom:6,
            }}
          >
            <Text><MaterialCommunityIcons name="office-building-cog" size={24} color="black" />Employee Management</Text>
            <AntDesign name={employee ? 'up' : 'down'} size={14} color="black" />
          </TouchableOpacity>

          {employee && (
            <View style={{ paddingLeft: 10, marginBottom:6, gap:4, }}>
              <DrawerItem
                label={() => (
                  <Text
                    style={{
                      color:  'black',
                      fontWeight: 'normal',
                      
                      
                    }}
                  >
                    <Entypo name="add-user" size={20} color="black" />
                    Add Employee
                  </Text>
                )}
                onPress={() => navigation.navigate('index')? 'blue' : 'transparent'}
                style={{
                  backgroundColor: isRouteFocused('index') ? '#e0f7ff' : 'transparent',
                }}
              />
              <DrawerItem 
                label={() => (
                  <Text
                    style={{
                        
                      color:  'black',
                      fontWeight: 'normal',
                      padding:4,
                    }}
                  ><FontAwesome6 name="eye" size={12} color="black" />
                     View Employee
                  </Text>
                )}
                onPress={() => navigation.navigate('Employee/index')? 'blue' : 'transparent'}
                style={{
                  backgroundColor: isRouteFocused('Employee/index') ? '#e0f7ff' : 'transparent',
                }}
              />
            </View>
          )}
        </View>
      )}
    </DrawerContentScrollView>
  );
}
