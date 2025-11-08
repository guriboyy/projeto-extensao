
import React, { use, useEffect, useState } from "react";
import { useAuthContext } from "../context/testeContext";
import { createUser, getAllUsers, getUserById, updateUser } from "../services/manageMembers";
import type {UserForm, UserManagerResponse } from "../types/api";
import { resolvePath, useNavigate, useParams } from "react-router-dom";



export function useManageUsers() {
    const {token} = useAuthContext();
    const [manageUsers, setManageUsers] = useState<UserManagerResponse>();
    const navigate = useNavigate()
    useEffect(() => {
    async function fetchUsers() {
      try {        
        const result = await getAllUsers(token);        
        setManageUsers(result);        
      } catch (err) {
        console.error(err);
      }
    }

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleNavigate = (id:number) => {    
    navigate(`/EditUsers/${id}`)  
  }

  
  return{
    manageUsers,
    handleNavigate
  }
}

export function useManageUsersChildren() {

    const {id} = useParams();
    const { token } = useAuthContext();
    const [editUsers, setEditUsers] = useState<UserForm>({
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      status: false,
      role: "1"  
    });
  
    const navigate = useNavigate();

    useEffect(() => {
      async function fetchUserById() {
        
        
        try {
          const client = await getUserById(id, token);        
          
          const userData = {
            name: client.data.firstName ?? "",
            lastName: client.data.lastName ?? "",
            email: client.data.email ?? "",
            phoneNumber: client.data.phoneNumber ?? "",
            status: client.data.isActive,
            role: String(client.data.role)
          };    
          
          setEditUsers(userData); 
          
        } catch (error) {
      
        }
      }

      if (id) {
        
        fetchUserById();
      } else {
        
      }
    }, [id, token]);

    useEffect(()=> {
      console.log(editUsers)
    },[editUsers])

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setEditUsers(prev => ({
        ...prev,
        [name]: name === "status" ? value === "true" : value
      }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try{
        let response:any = ""
        if(id){
            response = await updateUser(token, editUsers, id)
        } else {
            response = await createUser(token, editUsers)
        }
      } catch (err){
        console.log(err)
      }
    }

    const handleNavigate = () => {    
      navigate(`/ManageUsers/`)  

    }
    return{
      editUsers,
      setEditUsers,
      handleChange,
      handleSubmit,
      handleNavigate
    }
}