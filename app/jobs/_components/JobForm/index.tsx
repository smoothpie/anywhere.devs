"use client"
import { useState } from 'react';
import Input from '../../../../components/Input';
import Textarea from '../../../../components/Textarea';
import Select from '../../../../components/Select';
import { typeOptions, locationOptions } from '../../constants';
import { JobFormValues } from '../../../../types/job';
import companies from '../../../../data/companies.json';
import s from './JobForm.module.scss';

type JobFormProps = {
  initialValues?: any;
  onSubmit: (job: any) => void;
}

type FormErrors = {
  title?: string;
  slug?: string;
  description?: string;
  link?: string;
  type?: string;
  platform?: string;
  level?: string;
}

const JobForm = ({ initialValues, onSubmit }: JobFormProps) => {
  const [job, setJob] = useState(initialValues || {
    title: '',
    slug: '',
    description: '',
    link: '',
    type: "web-development",
    isPaid: false,
    price: null,
    platform: null,
    author: '',
    level: null,
    certificate: false,
    benefits: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    let updatedJob: any;
    if (name === 'price[amount]') {
      updatedJob = {
        ...job,
        price: { ...job.price, amount: Number(value) }
      };
    } else {
      updatedJob = {
        ...job,
        [name]: type === 'checkbox' ? checked : value
      };
    }
    setJob(updatedJob);
    if (Object.keys(errors).length) {
      setErrors(validateForm(updatedJob));
    }
  };

  const handleSelect = (name: string, value: string) => {
    let updatedJob: any;
    if (name.includes('price')) {
      const parsedName = name.split('[')[1].split(']')[0];
      updatedJob = {
        ...job,
        price: { ...job.price, [parsedName]: value }
      };
    } else {
      updatedJob = { ...job, [name]: value };
    }
    setJob(updatedJob);
    if (Object.keys(errors).length) {
      setErrors(validateForm(updatedJob));
    }
  }

  const validateForm = (jobData: any) => {
    let newErrors: FormErrors = {};

    if (!jobData.title) newErrors.title = 'Title is required.';
    if (!jobData.slug) newErrors.slug = 'URL slug is required.';
    if (!jobData.description) newErrors.description = 'Description is required.';
    if (!jobData.link) newErrors.link = 'Link is required.';
    if (!jobData.type) newErrors.type = 'Type is required.';
    if (!jobData.platform) newErrors.platform = 'Platform is required.';
    if (!jobData.level) newErrors.level = 'Level is required.';

    return newErrors;
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();

    const newErrors = validateForm(job);
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error);
    if (hasErrors) return;

    onSubmit(job);
  }

  const companyOptions = companies.map((company) => ({
    value: company.id,
    label: company.name
  }));

  const skillOptions: any = [];

  const niceToHaveOptions: any = [];

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.field}>
        <label htmlFor="title">Title:</label>
        <Input name="title" value={job.title} onChange={handleInputChange} />
        {errors.title && <p className={s.error}>{errors.title}</p>}
      </div>

      <div className={s.field}>
        <label htmlFor="link">Link to the original job posting or contact email:</label>
        <Input type="url" name="link" value={job.link} onChange={handleInputChange} />
        {errors.link && <p className={s.error}>{errors.link}</p>}
      </div>

      <div className={s.field}>
        <label htmlFor="description">Description:</label>
        <Textarea name="description" value={job.description} onChange={handleInputChange} rows={20} />
        {errors.description && <p className={s.error}>{errors.description}</p>}
      </div>

      <div className={s.field}>
        <label htmlFor="type">Type:</label>
        <Select
          name="type"
          options={typeOptions}
          value={typeOptions.find(v => v.value === job.type)}
          onChange={(option) => handleSelect('type', option?.value)}
          isSearchable
          isClearable
        />
        {errors.type && <p className={s.error}>{errors.type}</p>}
      </div>

      <div className={s.field}>
        <label htmlFor="price">Yearly salary range, USD:</label>
        <div className={s.price}>
          <Input
            type="number"
            name="price[amount].min"
            value={job.price?.amount?.min}
            onChange={handleInputChange}
            placeholder="Min"
          />
          <Input
            type="number"
            name="price[amount].max"
            value={job.price?.amount?.max}
            onChange={handleInputChange}
            placeholder="Max"
          />
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor="locations">Hiring remote in:</label>
        <Select
          name="locations"
          options={locationOptions}
          value={locationOptions.find(v => v.value === job.locations)}
          onChange={(option) => handleSelect('locations', option?.value)}
          isSearchable
          isClearable
          isMulti
        />
      </div>

      <div className={s.field}>
        <label htmlFor="locations">Required skills:</label>
        <Select
          name="skills"
          options={skillOptions}
          value={skillOptions.find((v: any) => v.value === job.skills)}
          onChange={(option) => handleSelect('skills', option?.value)}
          isSearchable
          isClearable
          isMulti
          isCreatable
        />
      </div>

      <div className={s.field}>
        <label htmlFor="locations">Nice to have/other stack:</label>
        <Select
          name="niceToHave"
          options={niceToHaveOptions}
          value={niceToHaveOptions.find((v: any) => v.value === job.niceToHave)}
          onChange={(option) => handleSelect('niceToHave', option?.value)}
          isSearchable
          isClearable
          isMulti
          isCreatable
        />
      </div>

      <div className={s.field}>
        <label htmlFor="experience">Minimum years of experience:</label>
        <Input type="number" name="experience" value={job.experience} onChange={handleInputChange} />
      </div>

      <div className={s.field}>
        <label>Benefits:</label>
        <div className={s.checkboxes}>
          <label>
            <input type="checkbox" name="benefits" value="healthcare" checked={job.benefits.includes('healthcare')} onChange={handleInputChange} />
            Healthcare
          </label>
          <label>
            <input type="checkbox" name="benefits" value="flexible-hours" checked={job.benefits.includes('flexible-hours')} onChange={handleInputChange} />
            Flexible hours
          </label>
          <label>
            <input type="checkbox" name="benefits" value="remote" checked={job.benefits.includes('remote')} onChange={handleInputChange} />
            Remote
          </label>
          <label>
            <input type="checkbox" name="benefits" value="training" checked={job.benefits.includes('training')} onChange={handleInputChange} />
            Training
          </label>
        </div>
      </div>

      <h3>Company details</h3>

      <div className={s.field}>
        <label htmlFor="company">Company:</label>
        <Select
          name="company"
          options={companyOptions}
          value={companyOptions.find(v => v.value === job.company)}
          onChange={(option) => handleSelect('company', option?.value)}
          isSearchable
          isClearable
        />
      </div>

      <div className={s.field}>
        <label htmlFor="companyDescription">Company description:</label>
        <Textarea name="companyDescription" value={job.companyDescription} onChange={handleInputChange} rows={10} />
      </div>

      <div className={s.field}>
        <label htmlFor="companyWebsite">Company website:</label>
        <Input type="url" name="companyWebsite" value={job.companyWebsite} onChange={handleInputChange} />
      </div>

      <div className={s.field}>
        <label htmlFor="companyLogo">Company logo:</label>
        <Input type="file" name="companyLogo" onChange={handleInputChange} />
      </div>

      <button className={s.submitBtn}>Submit</button>
    </form>
  )
}

export default JobForm;