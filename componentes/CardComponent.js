import{ StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function CardComponents({tittle, description, icon}) {
    return(
        <TouchableOpacity style={styles.card}> //TouchableOpacity es un boton con un efecto 
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={32} color="#ffffff" />
                </View>

                <View>
                <Text style={styles.tittle}>{tittle}</Text>
                <Text style={styles.description}>{description}</Text>   
            </View>
        </TouchableOpacity>
    )
}