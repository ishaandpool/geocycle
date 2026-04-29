import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { auth } from '@/FirebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const features = [
    { emoji: '📰', title: 'Eco News', description: 'Stay informed with the latest environmental headlines from around the world.' },
    { emoji: '♻️', title: 'Waste Classifier', description: 'Snap a photo of any waste item and instantly learn how to dispose of it.' },
    { emoji: '🌿', title: 'Eco Forum', description: 'Connect with others, share ideas, and discuss sustainable living.' },
];

export default function Index() {
    const router = useRouter();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            if (!user) {
                router.replace('/');
            } else if (user.displayName) {
                setUserName(user.displayName.split(' ')[0]);
            }
        });
        return () => unsubscribe();
    }, [router]);

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
            <View style={styles.heroSection}>
                <Image style={{ width: 90, height: 90, marginBottom: 16 }} source={require('@/assets/images/leaves.png')} />
                <Text style={styles.greeting}>{userName ? `Hello, ${userName} 👋` : 'Welcome back 👋'}</Text>
                <Text style={styles.header}>GeoCycle</Text>
                <Text style={styles.tagline}>Making sustainability simple, one choice at a time.</Text>
            </View>

            <View style={styles.featuresSection}>
                <Text style={styles.sectionLabel}>What you can do</Text>
                {features.map((f, i) => (
                    <View key={i} style={styles.featureCard}>
                        <Text style={styles.featureEmoji}>{f.emoji}</Text>
                        <View style={styles.featureText}>
                            <Text style={styles.featureTitle}>{f.title}</Text>
                            <Text style={styles.featureDesc}>{f.description}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.signOutButton} onPress={() => auth.signOut()}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>

            <Text style={styles.attribution}>Icons by Pixellez from pngtree.com</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '#0E1A0A',
    },
    container: {
        alignItems: 'center',
        padding: 24,
        paddingBottom: 48,
    },
    heroSection: {
        alignItems: 'center',
        paddingVertical: 32,
        width: '100%',
    },
    greeting: {
        fontSize: 16,
        color: '#6B8A52',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    header: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#8BC34A',
        letterSpacing: 2,
        marginBottom: 10,
    },
    tagline: {
        fontSize: 15,
        color: '#A0B87A',
        textAlign: 'center',
        maxWidth: 300,
        lineHeight: 22,
    },
    featuresSection: {
        width: Platform.select({ web: '60%', default: '100%' }),
        marginTop: 8,
        gap: 14,
    },
    sectionLabel: {
        fontSize: 12,
        color: '#6B8A52',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    featureCard: {
        backgroundColor: '#1C2B14',
        borderRadius: 14,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3D5C28',
        gap: 16,
    },
    featureEmoji: {
        fontSize: 32,
    },
    featureText: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#E8F0DC',
        marginBottom: 4,
    },
    featureDesc: {
        fontSize: 13,
        color: '#7A9B5A',
        lineHeight: 19,
    },
    signOutButton: {
        marginTop: 32,
        paddingVertical: 12,
        paddingHorizontal: 36,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#5B4A3A',
        backgroundColor: 'transparent',
    },
    signOutText: {
        color: '#8B6343',
        fontSize: 15,
        fontWeight: '600',
    },
    attribution: {
        marginTop: 24,
        color: '#3D5228',
        fontSize: 11,
    },
});
