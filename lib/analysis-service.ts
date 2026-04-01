import { db } from "./firebase";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
    Timestamp
} from "firebase/firestore";
import { Skill } from "./skill-extractor";
import { JobMatch } from "./job-matcher";

export interface AnalysisData {
    matchedSkills: Skill[];
    additionalSkills: Skill[];
    jobMatches: JobMatch[];
    lastAnalysisAt?: Timestamp;
    lastResumeFileName?: string;
}

export interface UserProfile extends AnalysisData {
    fullName: string;
    email: string;
    createdAt: Timestamp;
}

/**
 * Saves analysis results to the user's document in Firestore.
 */
export async function saveAnalysis(uid: string, data: AnalysisData) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        ...data,
        lastAnalysisAt: serverTimestamp(),
    });
}

/**
 * Loads the user's profile and analysis results from Firestore.
 */
export async function loadUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data() as UserProfile;
    }
    return null;
}

/**
 * Creates a new user document in Firestore.
 * Called during registration.
 */
export async function createUserProfile(uid: string, fullName: string, email: string) {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
        fullName,
        email,
        createdAt: serverTimestamp(),
        matchedSkills: [],
        additionalSkills: [],
        jobMatches: [],
    });
}
