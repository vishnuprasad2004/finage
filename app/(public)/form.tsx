import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import ThemedBackground from "@/components/ThemedBackground";
import Spacer from "@/components/Spacer";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthProvider } from "@/context/auth";
import { supabase } from "@/config/supabase";

type FormState = {
  age: string;
  gender: number;
  maritalStatus: number;
  educationLevel: number;
  employmentStatus: number;
  creditUtilizationRatio: string;
  paymentHistory: string;
  numberOfCreditAccounts: string;
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  typeOfLoan: number;
};


const CreditForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    age: "",
    gender: 1,
    maritalStatus: 1,
    educationLevel: 1,
    employmentStatus: 1,
    creditUtilizationRatio: "",
    paymentHistory: "",
    numberOfCreditAccounts: "",
    loanAmount: "",
    interestRate: "",
    loanTerm: "",
    typeOfLoan: 1,
  });


  const { name, email, password }: { name: string, email: string, password: string } = useLocalSearchParams();

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if(Object.values(form).some((val) => val === "")) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);
    const { data ,error } = await supabase.auth.signUp({ email, password, 
      options: {
        data: {
          name,
          age: parseInt(form.age),
          gender: form.gender,
          marital_status: form.maritalStatus,
          education_status: form.educationLevel,
          employment_status: form.employmentStatus,
          credit_utilization_ratio: parseFloat(form.creditUtilizationRatio),
          payment_history: parseInt(form.paymentHistory),
          number_of_credit_accounts: parseInt(form.numberOfCreditAccounts),
          loan_amount: parseFloat(form.loanAmount),
          interest_rate: parseFloat(form.interestRate),
          loan_term: parseInt(form.loanTerm),
          type_of_loan: form.typeOfLoan,  
        }
      }
    })
    setLoading(false);

    if(error) {
      ToastAndroid.show("Error: "+error.message, ToastAndroid.SHORT);
      return;
    } else {
      router.replace({ pathname: "/(tabs)", params: { form: JSON.stringify(form) }  });
    }
    console.log("Form Data:", form);
    
  };

  return (
    <ThemedBackground>  
      <AuthProvider>
        <View style={{flexDirection:"row", padding:10, alignItems:"center", paddingTop:10}}>
          <TouchableOpacity onPress={() => {router.back()}}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{fontSize:20, color:"white", paddingLeft:15}}>Please fill all these Fields</Text>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.label}>Age</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={form.age} onChangeText={(val) => handleChange("age", val)} placeholder="Enter age" placeholderTextColor="#aaa" />

          <Text style={styles.label}>Gender</Text>
          <Picker selectedValue={form.gender} onValueChange={(val) => handleChange("gender", val)} style={styles.picker} dropdownIconColor="#fff">
            <Picker.Item label="Male" value={1} />
            <Picker.Item label="Female" value={0} />
          </Picker>

          <Text style={styles.label}>Marital Status</Text>
          <Picker selectedValue={form.maritalStatus} onValueChange={(val) => handleChange("maritalStatus", val)} style={styles.picker} dropdownIconColor="#fff">
            <Picker.Item label="Single" value={0} />
            <Picker.Item label="Married" value={1} />
          </Picker>

          <Text style={styles.label}>Education Level</Text>
          <Picker selectedValue={form.educationLevel} onValueChange={(val) => handleChange("educationLevel", val)} style={styles.picker} dropdownIconColor="#fff">
            <Picker.Item label="High School" value={1} />
            <Picker.Item label="Bachelor's" value={2} />
            <Picker.Item label="Master's" value={3} />
            <Picker.Item label="Doctorate" value={4} />
          </Picker>

          <Text style={styles.label}>Employment Status</Text>
          <Picker selectedValue={form.employmentStatus} onValueChange={(val) => handleChange("employmentStatus", val)} style={styles.picker} dropdownIconColor="#fff">
            <Picker.Item label="Unemployed" value={0} />
            <Picker.Item label="Employed" value={1} />
            <Picker.Item label="Self-Employed" value={2} />
          </Picker>

          <Text style={styles.label}>Credit Utilization Ratio</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={form.creditUtilizationRatio} onChangeText={(val) => handleChange("creditUtilizationRatio", val)} placeholder="Enter ratio" placeholderTextColor="#aaa" />

          <Text style={styles.label}>Payment History</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={form.paymentHistory} onChangeText={(val) => handleChange("paymentHistory", val)} placeholder="Enter number" placeholderTextColor="#aaa" />

          <Text style={styles.label}>Number of Credit Accounts</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={form.numberOfCreditAccounts} onChangeText={(val) => handleChange("numberOfCreditAccounts", val)} placeholder="Enter number" placeholderTextColor="#aaa" />

          <Text style={styles.label}>Loan Amount</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={form.loanAmount} onChangeText={(val) => handleChange("loanAmount", val)} placeholder="Enter amount" placeholderTextColor="#aaa" />

          <Text style={styles.label}>Interest Rate</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={form.interestRate} onChangeText={(val) => handleChange("interestRate", val)} placeholder="Enter rate" placeholderTextColor="#aaa" />

          <Text style={styles.label}>Loan Term</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={form.loanTerm} onChangeText={(val) => handleChange("loanTerm", val)} placeholder="Enter term" placeholderTextColor="#aaa" />

          <Text style={styles.label}>Type of Loan</Text>
          <Picker selectedValue={form.typeOfLoan} onValueChange={(val) => handleChange("typeOfLoan", val)} style={styles.picker} dropdownIconColor="#fff" itemStyle={{color: "#fff"}}>
            <Picker.Item label="Personal Loan" value={1} />
            <Picker.Item label="Home Loan" value={2} />
            <Picker.Item label="Others" value={3} />
          </Picker>

          <Spacer margin={10} />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity style={[styles.button, {backgroundColor: "darkgrey"}]} onPress={() => {router.back()}} activeOpacity={0.7}>
              <Text style={{ color: "white" }}>BACK</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.7}>
              {loading ? <ActivityIndicator/> : <Text style={{ color: "white" }}>SIGN UP</Text>}
            </TouchableOpacity>

          </View>
        </ScrollView>
      </AuthProvider>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#222",
    color: "#fff",
    
  },
  picker: {
    padding:0,
    margin:0,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    marginVertical: 5,
    color: "#fff",
    backgroundColor: "#222",

  },
  button: {
    width:150,
    backgroundColor: '#319A36',
    padding: 4,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
});

export default CreditForm;
