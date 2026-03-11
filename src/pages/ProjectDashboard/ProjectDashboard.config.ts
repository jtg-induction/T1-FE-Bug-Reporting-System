import { ProjectUpdateFormData } from './ProjectDashboard.types';

export const INITIAL_EDIT_STATE: ProjectUpdateFormData = {
    title: '',
    description: '',
    status: 1,
};

export const DASHBOARD_TEXT = {
    editTitle: 'Edit Project',
    saveBtn: 'Save Changes',
    cancelBtn: 'Cancel',
    loading: 'Loading...',
    saving: 'Saving...',
};
