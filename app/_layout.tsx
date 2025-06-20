
import { createDrawerNavigator } from '@react-navigation/drawer';
import { withLayoutContext } from 'expo-router';
import CustomDrawer from '../Components/CustomDrawer';

const DrawerNavigator = createDrawerNavigator();
const Drawer = withLayoutContext(DrawerNavigator.Navigator);

export default function DrawerLayout() {
  return (
    <Drawer drawerContent={(props)=> <CustomDrawer {...props}/>}>
      <Drawer.Screen name="index" options={{ title: 'Add Employee' }} />
      <Drawer.Screen name="Employee/index" options={{ title: 'View Employee' }} />
    </Drawer>
  );
}
