import { useState, useRef } from 'react';

function useForm(initialState: any) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<any>({});

  function updateForm(obj: any) {
    setForm({ ...obj });
  }

  function updateField(field: any, newValue: string) {
    const newForm = {...form};
    const newErrors = { ...errors };
    
    newForm[field] = newValue;
    newErrors[field] = false;

    setForm({...newForm});
    setErrors({...newErrors});
  }


  function resetFields(obj: any) {
    const newErrors: any = {};
    
    Object.entries(form).forEach(([field, value]) => {
      newErrors[field] = '';
    });
    
    setForm({
      ...newErrors
    });
  }

  function validateFields() {
    const newErrors: any = {};
    
    Object.entries(form).forEach(([field, value]) => {
      const isEmpty = typeof value === 'string' ? !value.trim() : !value;
      newErrors[field] = isEmpty;
    });
    
    setErrors({
      ...newErrors
    });
  }
  
  function hasOneFieldEmpty() {
    const hasFieldEmpty = (value: any) => !value.toString().trim();
    return Object.values(form).some(hasFieldEmpty);
  }

  return [
    form, errors,
    updateField, validateFields,
    hasOneFieldEmpty, resetFields,
    updateForm
  ]
}

export default useForm;
