from django.contrib import admin

from .models import *
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['name', 'email',  'is_superuser']
    list_filter = [ 'is_superuser']
    ordering = ['email']
    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)
        fieldsets = (
            ('User ID', {'fields': ('user_id',)}),
        ) + fieldsets
        return fieldsets
   
    readonly_fields = (('user_id',))

    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'profile_image')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('name', 'email', 'password', 'profile_image', 'is_staff', 'is_superuser'),
        }),
    )
    search_fields = ['email', 'name']
    filter_horizontal = ['user_permissions']


admin.site.register(User,CustomUserAdmin)